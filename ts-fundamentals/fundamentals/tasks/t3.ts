// Type function hasPermission. See example for more details

function hasAccess(user: User, features: Feature | Feature[]) {
  const role: string = user.role;
  const rolePermissions: FeatureObj = permissions[role];
  const featuresToCheck: Feature[] = Array.isArray(features) ? features : [features];
  return featuresToCheck.every((feature: string) =>
    ["READ", "READ_WRITE"].includes(rolePermissions[feature])
  );
}

const hasAccessToCatalog: boolean = hasAccess(user1, "catalog");
const hasAccessToCatalogAndBasket: boolean = hasAccess(user1, ["basket", "catalog"]);
