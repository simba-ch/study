import Home from "../components/Home.vue";
import User from "../components/User.vue";
import Profile from "../components/Profile.vue";
import Posts from "../components/Posts.vue";
import Count from "../components/Count.vue";
const About = { template: `<div>About</div>` };

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/user",
    component: User,
    children: [
      { name: "Profile", path: "profile", component: Profile },
      { name: "Posts", path: "posts", component: Posts, redirect: "/about" },
    ],
  },
  {
    path: "/count",
    component: Count,
  },
];
