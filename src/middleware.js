


export default async function middleware(req){
  /*
   
    console.log("TRACKING");

    const { nextUrl } = req;
    
    
    const authCookie = req.cookies.get("authjs.session-token");

    console.log(nextUrl.pathname)


    if (authCookie) 
        console.log("logged in")

    if (!authCookie && nextUrl.pathname!== "/") {
        console.log("Xnot logged in")
        return Response.redirect(new URL('/', nextUrl));
    }
  
    
    try{
        analytics.track("page-view",{
            page: '/store/:path*',

        })        
    } catch(error) {
        // RUN SILENTLY
        console.log(error)
    }

    
    */
    

}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],}