import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 

import getOrcreateDB from './models/server/dbSetup';
import getOrCreateStorage from "./models/server/storageSetup";


// this function can be marked 'async' if using await inside
export async function middleware(request: NextRequest) {

    await Promise.all([
        getOrcreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    /* Match all request paths except for the ones starting with:

    - api
    - _next/static
    - _next/image
    - favicon.com
    */

    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",],
}