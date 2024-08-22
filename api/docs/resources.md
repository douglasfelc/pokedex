# API REST Resources Documentation

[Click here](../README.md) to return to API documentation.

[Click here](../../README.md) to return to general documentation.


## GET /pokemon

Description: Retrieves a paginated list of Pokémon. By default, it returns 20 Pokémon starting from the offset 0, but you can adjust the limit and offset via query parameters.
Authentication: Not Required.

### Request

**Method:** GET \
**URL:** /pokemon?limit=20&offset=0

#### Query Parameters:

**limit** (optional): Number of Pokémon to retrieve (default: 20). \
**offset** (optional): Number of Pokémon to skip before starting to collect the result set (default: 0).

### Response:

**Status:** 200 OK \
**Content-Type:** application/json

Body:

```bash
{
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        ...
    ]
}
```

### Error Responses:

* 400: Bad Request
* 401: Unauthorized
* 500: Internal Server Error


## GET /pokemon/:name

Description: Retrieves detailed information about a specific Pokémon by its name.
Authentication: Not Required.

### Request:

**Method:** GET \
**URL:** /pokemon/:name

#### Path Parameters: \
**name** (required): The name of the Pokémon to retrieve.

### Response:

**Status:** 200 OK \
**Content-Type:** application/json

Body:

```bash
{
    "abilities": [
        {
            "ability": {
                "name": "overgrow",
                "url": "https://pokeapi.co/api/v2/ability/65/"
            },
            "is_hidden": false,
            "slot": 1
        },
        {
            "ability": {
                "name": "chlorophyll",
                "url": "https://pokeapi.co/api/v2/ability/34/"
            },
            "is_hidden": true,
            "slot": 3
        }
    ],
    "base_experience": 64,
    "cries": {
        "latest": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
        "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
    },
    "forms": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon-form/1/"
        }
    ],
    "game_indices": [
        {
            "game_index": 153,
            "version": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/version/1/"
            }
        },
    ],
    ...  
    ],
    "stats": [
        {
            "base_stat": 45,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
    ],
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            }
        }
    ],
    "weight": 69
}
```

### Error Responses:

* 400: Bad Request
* 401: Unauthorized
* 500: Internal Server Error
