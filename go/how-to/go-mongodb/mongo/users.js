const createdAt = new Date().toISOString();
const updatedAt = "";

const users = [
  {
    name: "Keshi",
    description: "Just Keshi thing <3",
    contact: "0234234",
    email: "keshi@gmail.com",
    accessToken: "",
    active: true,
    createdAt,
    updatedAt,
  },
  {
    name: "Dijon",
    description: ":)",
    contact: "0234512",
    email: "dijon@gmail.com",
    accessToken: "",
    active: true,
    createdAt,
    updatedAt,
  },
  {
    name: "The Weeknd",
    description: "The Weeknd without e",
    contact: "",
    email: "",
    accessToken: "",
    active: true,
    createdAt,
    updatedAt,
  },
];

conn = new Mongo();
db = conn.getDB("soundry");
db.createCollection("users");
db.users.insert(users);
