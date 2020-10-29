const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 유저 정보 입력
router.post("/enroll", (req, res) => {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error sigup new user please try again");
    } else {
      res.status(200).send("Success");
    }
  });
});

// 회원 수정
router.post("/update", (req, res) => {
  User.updateOne({ sender : req.body.sender }, { $set: req.body }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: '서버 에러' })
    } else if (!result.n) {
      res.status(401).json({ message: '유저가 없다' })
    } else {
      res.status(200).json({ message: '업데이트 성공' })
    }
  })
})

// 신체 정보 찾기 
router.get("/userfind", (req, res) => {
  User.findOne({ sender : req.query.sender }, { _id: 0, __v: 0 }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: "Find False" })
    } else if (!result) {
      res.status(401).json({ message: "유저가 존재하지 않습니다." })
    } else {
      res.status(200).json(result)
    }
  })
})

// 회원 탈퇴
router.post("/withdrawal", (req, res) => {
  User.deleteOne({ sender : req.body.sender }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: "서버에러" })
    }
    res.status(200).json({ message: "삭제 성공" })
  })
})

module.exports = router;
