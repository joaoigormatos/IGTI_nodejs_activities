const swaggerDoc = {
  "swagger": "2.0",
  "info": {
    "description": "My Bank API description",
    "version": "1.0.0",
    "title": "My bank api description"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account Manager"
    }
  ],
  "paths": {
    "/account": {
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Add a new account to the bank",
        "description": "",
        "operationId": "addAccount",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object that needs to be added to the account",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        },
        "security": [
          {
            "petstore_auth": [
              "write:pets",
              "read:pets"
            ]
          }
        ]
      },
      "put": {
        "tags": [
          "account"
        ],
        "summary": "Update an existing pet",
        "description": "",
        "operationId": "updateAccount",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object that needs to be added to the bank",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Account not found"
          },
          "405": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "petstore_auth": [
              "write:pets",
              "read:pets"
            ]
          }
        ]
      }
    },
    "/account/{accountId}": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Find account by ID",
        "description": "Returns a single account",
        "operationId": "getPetById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to return",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Account"
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Account not found"
          }
        },
        "security": [
          {
            "api_key": []
          }
        ]
      }
    }
  },
  "securityDefinitions": {
    "petstore_auth": {
      "type": "oauth2",
      "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
      "flow": "implicit",
      "scopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
      }
    },
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "ballance": {
          "type": "number",
          "format": "number"
        },
        "name": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Account"
      }
    }
  }
}

module.exports = swaggerDoc