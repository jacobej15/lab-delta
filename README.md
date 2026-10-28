# Dev-Delta-JSON
CIS376 fall json fetch lab.

## Before you leave, be able to answer:

### Where did each piece of data in your final object come from?
Each piece of data came from a different source. The name and comment came from the user's form input, the favorite came from the local JSON file through the dropdown, and the dog image URL came from the external Dog CEO API.

### At what point did all of those separate pieces of data become one application state?
They became one application state when JavaScript combined the separate values into the userData object. The application state was then saved in sessionStorage using JSON.stringify(), allowing the application to retrieve and render the saved profile later.
