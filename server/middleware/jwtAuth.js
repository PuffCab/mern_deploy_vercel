import passport from "passport";

const jwtAuth = passport.authenticate("jwt", { session: false });

// const jwtAuthCustom = (req, res, next) => {
//   return passport.authenticate("jwt", { session: false }, (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(500).json({
//         status: "error",
//         error: "not Auth user, bad token o lo que sea",
//       });
//     }
//     if (user) {
//       req.user = user;

//       return next();
//     }
//   })(req, res, next);
// };

export default jwtAuth;
// export default jwtAuthCustom;
