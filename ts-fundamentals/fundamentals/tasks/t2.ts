// Define the following types Role (use enum), Feature (use union), Permissions, FeaturePermission. Available roles
// are guest, user, and admin. Available features are catalog, basket, news, report. Available permissions are NO_ACCESS
// , READ, READ_WRITE. For type FeaturePermission use utility types Record and Partial.

// TODO: define Role, Feature, Permission and FeaturePermission

let role: Role = Role.Guest;

let feature: Feature = "catalog";
let permission: Permission = "READ";
const permissions: FeaturePermission = {
  guest: {
    catalog: "READ",
    news: "READ",
  },
  user: {
    catalog: "READ",
    basket: "READ_WRITE",
    news: "READ",
  },
  admin: {
    catalog: "READ_WRITE",
    news: "READ",
    report: "READ",
  },
};
