
exports.getInteger = async (req, res, next) => {
      try {
        if (req.body.num){
         if (req.body.num % 5 == 0) {
            res.status(200).json({
               message: "L"
            });
         } else if(req.body.num % 7 == 0) {
            res.status(200).json({
                message: "R"
             });
         } else if(req.body.num % 5 == 0 && req.body.num % 7 == 0) {
            res.status(200).json({
                message: "LR"
             });
         } else {
            res.status(200).json({
                message: "Not a multiple of 5 or 7"
             });
         }} else {
            res.status(200).json({
                message: "Please enter a number"
             });
         }
      } catch (error) {
          return res.status(500).json({ message: "Internal server error." })
      }
  }
