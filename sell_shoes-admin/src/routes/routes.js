import config from "~/config";

import { HeaderOnly } from "~/layouts";
import { SidebarOnly } from "~/layouts";

import Home from "~/pages/Home";
import User from "~/pages/User";
import Category from "~/pages/Category";
import Product from "~/pages/Product";
import NewProduct from "~/pages/NewProduct";
import Login from "~/pages/Login";
import Order from "~/pages/Order";
import Blog from "~/pages/Blog";
import Chat from "~/pages/Chat";
import Sales from "~/pages/Sales";
import NewSales from "~/pages/Sales/NewSales";
import Statistical from "~/pages/Statistical/Statistical";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.user, component: User },
  { path: config.routes.product, component: Product },
  { path: config.routes.category, component: Category },
  { path: config.routes.newproduct, component: NewProduct },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.order, component: Order },
  { path: config.routes.blog, component: Blog },
  { path: config.routes.chat, component: Chat },
  { path: config.routes.sales, component: Sales },
  { path: config.routes.newsales, component: NewSales },
  { path: config.routes.statistical, component: Statistical },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
