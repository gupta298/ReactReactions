var express = require('express');
var router = express.Router();

const comments = [
  {
    "id": 1,
    "comment": "Bought BABA calls for April",
    "name": "Varun Gupta",
    "reactions": [
      {
        "emoji": "⭐",
        "label": "Star",
        "counter": 5
      },
      {
        "emoji": "💰",
        "label": "Cash",
        "counter": 4
      },
      {
        "emoji": "😂",
        "label": "Haha",
        "counter": 2
      }
    ]
  },
  {
    "id": 2,
    "comment": "Bought STEM at $23.30",
    "name": "Bobby Gupta",
    "reactions": [
      {
        "emoji": "⬆",
        "label": "Up",
        "counter": 5
      },
      {
        "emoji": "😂",
        "label": "Haha",
        "counter": 4
      },
      {
        "emoji": "😮",
        "label": "Wow",
        "counter": 2
      }
    ]
  },
  {
    "id": 3,
    "comment": "Bought MP at $30",
    "name": "Tom Johnson",
    "reactions": [
      {
        "emoji": "⬆",
        "label": "Up",
        "counter": 5
      },
      {
        "emoji": "⬇",
        "label": "Down",
        "counter": 4
      },
      {
        "emoji": "💰",
        "label": "Star",
        "counter": 2
      }
    ]
  },
];

router.get("/", (request, response) => {
  return response.send({ comments });
});

router.get("/getReactions/:commentId", (request, response) => {
  var commentId = request.params["commentId"]
  for (comment of comments) {
    if (comment["id"] == commentId) {
      reactions = comment["reactions"];
      return response.send({ reactions });
    }
  }

  return response.status(404).json({ message: "Could not find the comment" });
});

router.post("/addReaction/:commentId", (request, response) => {
  var commentId = request.params["commentId"]
  for (comment of comments) {
    if (comment["id"] == commentId) {
      comment["reactions"] = request.body["reactions"];
      return response.send({ message: "Done successfully" });
    }
  }

  return response.status(404).json({ message: "Could not find the comment" });
});

module.exports = router;