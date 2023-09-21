import {
  AddressBook,
  BrandBlogger,
  BrandFoursquare,
  BrandVite,
  Category2,
  Discount,
  DiscountOff,
  Graph,
  Settings,
  Users,
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
    label: "Sub Categories",
    icon: Category2,
    links: [
      { label: "Add Sub Category", link: routeNames.general.addSubCategory },
      {
        label: "View Sub Categories",
        link: routeNames.general.viewSubCategories,
      },
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
    label: "Users",
    icon: Users,
    link: routeNames.general.users,
  },
  {
    label: "Sales",
    icon: Discount,
    links: [
      { label: "Add Sale", link: routeNames.general.addSale },
      { label: "View Sales", link: routeNames.general.viewSales },
    ],
  },
  {
    label: "Coupens",
    icon: DiscountOff,
    links: [
      { label: "Add Coupen", link: routeNames.general.addCoupen },
      { label: "View Coupens", link: routeNames.general.viewCoupens },
    ],
  },
  {
    label: "Accounts",
    icon: BrandVite,
    links: [
      { label: "Add Expenses", link: routeNames.general.addExpenses },
      { label: "View Expenses", link: routeNames.general.viewExpesnes },
      { label: "Add Revenue", link: routeNames.general.addRevenue },
      { label: "View Revenue", link: routeNames.general.revenue },
    ],
  },
  {
    label: "Orders",
    icon: AddressBook,
    link: routeNames.general.orders,
  },
  {
    label: "Blogs",
    icon: BrandBlogger,
    links: [
      { label: "Add Blog", link: routeNames.general.addBlog },
      { label: "View Blogs", link: routeNames.general.viewBlog },
    ],
  },
  {
    label: "FAQs",
    icon: BrandFoursquare,
    links: [
      { label: "Add FAQ", link: routeNames.general.addFaq },
      { label: "View FAQs", link: routeNames.general.viewFaq },
    ],
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
