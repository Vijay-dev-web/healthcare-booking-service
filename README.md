# healthcare-booking-service


# SERVICE NAME  - healthcare-booking-service

## Architecture 
 * * Onion Architecture 
        - Onion Architecture is a project structural pattern that favors us with maintainable and testable code for enterprise systems. It enables us to have a different layer for a different level like Model, DA, Service, Controller, View.
 * * Microservice Patterns 
        - Factory Pattern
            - An Factory Pattern service would be the one that provides the common public API which is consumed by the clients.
 * * Domain Driven Design (DDD) 
        - Domain-Driven Design(DDD) is a collection of principles and patterns that help developers craft elegant object systems .
 * * Clean Code Principles 
        - Clean code should be readable
        - Clean code should be elegant.
        - Clean code should be simple and easy to understand [SRP single responsibility principle]
        - Clean code should be easy to understand, easy to change and easy to taken care of .
        - Clean code should run all the tests.
 * * SOLID principles       
        - single responsibility principle, 
        - open-closed principle, 
        - Liskov substitution principle, 
        - interface segregation principle
        - dependency inversion principle.
 * * Test Driven Development 
    - TDD is a development technique where you must first write a test that fails before you write new functional code .

## Techstack ##
- Nodejs V18.17.0

* * Packages 
- Expressjs 
- Mongoose


* * DATABASE 
- MongoDb 

## How to Run 
 - Production 
    * * npm start 
- Development 
    * * npm run dev 

- Debug Mode 
    * * node --inspect index.js
- Test 
    * * npm run test

# # HEALTHCHECK
* * http://localhost:3003/home
* * http://localhost:3003/health
# # API DOCS 
    http://localhost:3000/api-docs



## Onion Architecture
    ![Alt text](onion-architecture.png)

# # HAPPY CODING :grinning:

* * BAYER HACKTHON :blush:

* * Copy rights © Prakashk
