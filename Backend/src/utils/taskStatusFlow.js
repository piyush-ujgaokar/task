const validTransitions = {

  "To Do": [
    "In Progress"
  ],

  "In Progress": [
    "Done"
  ],

  "Done": [
    "Closed"
  ],

  "Closed": []

}

module.exports =validTransitions