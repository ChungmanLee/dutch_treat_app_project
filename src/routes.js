export const ROUTES = {
        CREATE_GROUP: "/group",
        ADD_MEMBERS:"/members",
        EXPENSE_MAIN:"/expense"
}

const replaceGuid = (route, guid) => route.replace(":guid", guid)

export const ROUTE_UTILS = {
  ADD_MEMBERS: (guid) => replaceGuid(ROUTES.ADD_MEMBERS, guid),
  EXPENSE_MAIN: (guid) => replaceGuid(ROUTES.EXPENSE_MAIN, guid),
}