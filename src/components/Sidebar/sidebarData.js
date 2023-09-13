import {
  AddressBook,
  BrandVite,
  Category2,
  Graph,
  Settings,
} from "tabler-icons-react";
import { routeNames } from "../../Routes/routeNames";
export const sidebarData = [
  {
    label: "Dashboard",
    icon: Graph,
    link: routeNames.general.landing,
  },
  {
    label: "Categories",
    icon: Category2,
    links: [
      { label: "Add Category", link: routeNames.general.addCategory },
      { label: "View Categories", link: routeNames.general.viewCategory },
    ],
  },
  {
    label: "Products",
    icon: BrandVite,
    links: [
      { label: "Add Product", link: routeNames.general.addProduct },
      { label: "View Products", link: routeNames.general.viewProducts },
    ],
  },
  {
    label: "Sales",
    icon: BrandVite,
    links: [
      { label: "Add Sale", link: routeNames.general.addSale },
      { label: "View Sales", link: routeNames.general.viewSales },
    ],
  },
  {
    label: "Accounts",
    icon: BrandVite,
    links: [
      { label: "Add Expenses", link: routeNames.general.addExpenses },
      { label: "View Expenses", link: routeNames.general.viewExpesnes },
      { label: "View Revenue", link: routeNames.general.revenue },
    ],
  },
  {
    label: "Orders",
    icon: AddressBook,
    link: routeNames.general.orders,
  },
  {
    label: "About Us",
    icon: AddressBook,
    link: routeNames.general.aboutUs,
  },
  {
    label: "Settings",
    icon: Settings,
    link: routeNames.general.settings,
  },
];
