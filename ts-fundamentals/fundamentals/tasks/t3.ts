// Type function hasPermission. See example for more details

function hasAccess(user, features) {
  const role = user.role;
  const rolePermissions = permissions[role];
  const featuresToCheck = Array.isArray(features) ? features : [features];
  return featuresToCheck.every((feature) =>
    ["READ", "READ_WRITE"].includes(rolePermissions[feature])
  );
}

const hasAccessToCatalog = hasAccess(user, "catalog");
const hasAccessToCatalogAndBasket = hasAccess(user, ["basket", "catalog"]);
