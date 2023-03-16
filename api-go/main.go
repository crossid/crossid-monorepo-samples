package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/MicahParks/keyfunc"
	"github.com/crossid/crossid-go/pkg/jwtmw"
	"github.com/golang-jwt/jwt/v4"
	"log"
	"net/http"
	"os"
)

func main() {
	// Create the JWKs from the resource at the given URL.
	jwks, err := keyfunc.Get(os.Getenv("ISSUER_BASE_URL")+"/.well-known/jwks.json", keyfunc.Options{
		RefreshErrorHandler: func(err error) {
			log.Printf("There was an error with the jwt.KeyFunc\nError:%s\n", err.Error())
		},
	})
	if err != nil {
		log.Fatalf("Failed to create JWKs from resource at the given URL.\nError:%s\n", err.Error())
	}

	// Create the middleware provider.
	authmw := jwtmw.NewJWT(&jwtmw.JwtMiddlewareOpts{
		// Ensure signing method to avoid tokens ׳with "none" method.
		SigningMethod: jwt.SigningMethodRS256,
		Logger: func(level jwtmw.Level, format string, args ...interface{}) {
			log.Printf(format, args...)
		},
		KeyFunc: func(ctx context.Context, t *jwt.Token) (interface{}, error) {
			return jwks.Keyfunc(t)
		},
	})

	// Create a middleware that ensures token has the "openid" and "profile" scope.
	withScopes := jwtmw.WithScopes("openid")

	// Our protected handler
	var protectedHandler = http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// tok is the verified JWT token
		tok := req.Context().Value(jwtmw.TokenCtxKey)
		claims := tok.(*jwt.Token).Claims.(jwt.MapClaims)

		w.WriteHeader(200)
		json.NewEncoder(w).Encode([]map[string]interface{}{
			{
				"id":          "1",
				"name":        fmt.Sprintf("Hello %v", claims["sub"]),
				"description": "This is a personal post.",
			},
			{
				"id":          "2",
				"name":        "What is Crossid",
				"description": "Crossid is a lean identity platform.",
			},
			{
				"id":          "3",
				"name":        "Can I start free?",
				"description": "sure thing, visit crossid website for more.",
			},
		})
	})

	// wrap handler with auth middlewares
	app := authmw.Handler(withScopes(protectedHandler))

	fmt.Println("serving on 0.0.0.0:8080")
	if err = http.ListenAndServe("0.0.0.0:8080", app); err != nil {
		panic(err.Error())
	}
}
