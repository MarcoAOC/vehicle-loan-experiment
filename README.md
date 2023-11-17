# Vehicle Loan APR

---

### Proposed Solution

Due to the nature of rules and restrictions for the calculation, I had a understanding that `personCreditScore`, `loanAmount`, and `loanTerm` are the only values that is needed for determining the baseRate. After that base calculation, the vehicle details, referred to as assets in the code, are used to make an final increment at the value.

I developed a solution that involves incorporating a `BaseAPR` and an `AssetAddition` to streamline the calculation process in a way that enable easy adjustments of new asset types in the future.


### How to run

To run the project you can run one of these commands at root of project

```
docker-compose up
```

Or you can run using

```
yarn && yarn start
```

If you use the Docker option, make sure that the docker daemon is running before run the command.

In both cases the API will be served at localhost:3000

### API Docs

After run the project you can see the API documentation at: `localhost:3000/docs`.

There you're gonna find an example of how to call the endpoint created. 

The endpoint path for the calculation is : `GET localhost:3000/loan/vehicle-apr` 

The other endpoint is just to create a future health check for the API.

It was auto generated by Swagger.
