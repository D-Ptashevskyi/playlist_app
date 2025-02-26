# Playlist App - Automated Tests

## Setup Instructions

To get started with running the automated tests for the Playlist App, follow the steps below.

First, clone the repository to your local machine using the following commands:

```bash

1. Install Dependencies

npm install

2. Install Playwright Browsers

npx playwright install

3. Run the Tests
To execute the tests, run the following command:

npx playwright test
This will run all the tests in headless mode. If you would prefer to see the tests running in a visible browser, you can run the tests in headed mode by using the following command:

npx playwright test --headed
This command will show the browser during test execution, which can be useful for debugging.