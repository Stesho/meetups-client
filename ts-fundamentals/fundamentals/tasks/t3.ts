// Type function hasPermission. See example for more details

function hasAccess(user: User, features: Feature | Feature[]): boolean {
  const role: `${Role}` = user.role;
  const rolePermissions: FeaturesPermissions= permissions[role];
  const featuresToCheck: Feature[] = Array.isArray(features) ? features : [features];
  const noAccess: Permission = "NO_ACCESS";
  return featuresToCheck.every((feature: Feature) => 
    ["READ", "READ_WRITE"].includes(rolePermissions[feature] || noAccess)
  );
}

const hasAccessToCatalog = hasAccess(user1, "catalog");
const hasAccessToCatalogAndBasket = hasAccess(user1, ["basket", "catalog"]);
