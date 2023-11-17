# Vehicle Loan APR

---
### Overview
This API is designed to calculate the Annual Percentage Rate (APR) for vehicle loans based on specified parameters. The calculation involves factors such as `personCreditScore`, `loanAmount`, `loanTerm`, and additional details about the vehicle (referred to as assets).

### Proposed Solution

To facilitate the APR calculation process, the solution introduces two key components: `BaseAPR` and `AssetAddition`. The `BaseAPR` is determined by the core parameters (`personCreditScore`, `loanAmount`, `loanTerm`), and the `AssetAddition` allows for seamless integration of new asset types in the future.

### How to run

To run the project, you can use either Docker or Yarn directly.

#### Docker
Ensure that the Docker daemon is running, and then execute the following command at the root of the project:
```bash
docker-compose up
```

#### Yarn
If you prefer using just Yarn, run the following commands at the root of the project:

```bash
yarn
yarn start
```

In both cases the API will be served at `localhost:3000`

### API Documentation
Once the project is running, you can access the API documentation at: `localhost:3000/docs`.

#### Endpoint for Vehicle APR Calculation
The endpoint for calculating the vehicle loan APR is:

```
GET localhost:3000/loan/vehicle-apr
```

Make sure to provide the necessary parameters as specified in the documentation.

The provided example for this coding exercise can be executed within the documentation.

#### Health Check Endpoint
Additionally, there is a health check endpoint:

```
GET localhost:3000/health
```

This endpoint can be used for monitoring the API's health.

Feel free to explore the API documentation for more details and examples on how to interact with the provided endpoints.
