// creates a new user for the home_automation db
// can we expose these as $MONGODB_USER_USERNAME/PASSWORD?
db.createUser({
  user: "system",
  pwd: "pass",
  roles: [
    {
      role: "readWrite",
      db: "home_automation",
    },
  ],
});
