import { NextResponse } from "next/server";
import { supabaseDb, DEFAULT_COMMUNITY_EFFECTS } from "@/lib/supabase";

export async function GET() {
  try {
    const effects = await supabaseDb.fetchEffects(20);
    return NextResponse.json({ success: true, effects });
  } catch (err: any) {
    console.error("Fetch Effects Error:", err);
    return NextResponse.json({ success: true, effects: DEFAULT_COMMUNITY_EFFECTS });
  }
}
