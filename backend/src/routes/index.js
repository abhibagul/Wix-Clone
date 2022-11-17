import { signUpRoute } from "./signUpRoute.js";
import { loginRoute } from "./loginRoute.js";
import { createWebsite } from "./createWebsite.js";
import { getUserProject } from "./getUserProjects.js";
import { getWebPage } from "./getWebsitePage.js";
import { saveWebPage } from "./saveWebpage.js";
import { saveWebPrev } from "./updateWebsitePrev.js";
export const routes = [
    signUpRoute,
    loginRoute,
    createWebsite,
    getUserProject,
    getWebPage,
    saveWebPage,
    saveWebPrev
]