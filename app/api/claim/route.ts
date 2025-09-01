// app/api/claim/route.ts
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);


  console.log("CLAIM request:", body);

  return Response.json({
    ok: true,
  
  });
}
