import {
  AddressBook,
  BrandBlogger,
  BrandFoursquare,
  BrandVite,
  BrandWechat,
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
    label: "Users",
    icon: Users,
    link: routeNames.general.users,
  },
  {
    label: "Categories",
    icon: Category2,
    links: [
      // { label: "Add Category", link: routeNames.general.addCategory },
      { label: "View Categories", link: routeNames.general.viewCategory },
      {
        label: "View Sub Categories",
        link: routeNames.general.viewSubCategories,
      },
    ],
  },
  // {
  //   label: "Sub Categories",
  //   icon: Category2,
  //   links: [
  //     { label: "Add Sub Category", link: routeNames.general.addSubCategory },
  //     {
  //       label: "View Sub Categories",
  //       link: routeNames.general.viewSubCategories,
  //     },
  //   ],
  // },
  {
    label: "Products",
    icon: BrandVite,
    link: routeNames.general.viewProducts,
    //   { label: "Add Product", link: routeNames.general.addProduct },
    //   { label: "View Products", link: routeNames.general.viewProducts },
    // ],
  },
  {
    label: "Coupens",
    icon: DiscountOff,
    link: routeNames.general.viewCoupens,
    //   { label: "Add Coupen", link: routeNames.general.addCoupen },
    //   { label: "View Coupens", link: routeNames.general.viewCoupens },
    // ],
  },
  {
    label: "Orders",
    icon: AddressBook,
    link: routeNames.general.orders,
  },
  {
    label: "Sales",
    icon: Discount,
    link: routeNames.general.addSale,
    //   { label: "Add Sale", link: routeNames.general.addSale },
    //   { label: "View Sales", link: routeNames.general.viewSales },
    // ],
  },

  {
    label: "Accounts",
    icon: BrandVite,
    links: [
      // { label: "Add Expenses", link: routeNames.general.addExpenses },
      { label: "View Expenses", link: routeNames.general.viewExpesnes },
      // { label: "Add Revenue", link: routeNames.general.addRevenue },
      { label: "View Revenue", link: routeNames.general.revenue },
    ],
  },
  {
    label: "Complaints",
    icon: BrandWechat,
    link: routeNames.general.viewComplaints
      // { label: "Complaints", link: routeNames.general.viewExpesnes },
      // { label: "Feedback", link: routeNames.general.revenue },
    // ],
  },
  {
    label: "About Us",
    icon: AddressBook,
    link: routeNames.general.aboutUs,
  },

  {
    label: "Blogs",
    icon: BrandBlogger,
    link: routeNames.general.viewBlog,
    //   { label: "Add Blog", link: routeNames.general.addBlog },
    //   { label: "View Blogs", link: routeNames.general.viewBlog },
    // ],
  },
  {
    label: "FAQs",
    icon: BrandFoursquare,
    link: routeNames.general.viewFaq,
    //   { label: "Add FAQ", link: routeNames.general.addFaq },
    //   { label: "View FAQs", link: routeNames.general.viewFaq },
    // ],
  },

  {
    label: "Settings",
    icon: Settings,
    link: routeNames.general.settings,
  },
];
