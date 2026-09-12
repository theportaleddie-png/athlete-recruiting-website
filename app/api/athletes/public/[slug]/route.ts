import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { publicAthlete } from '../../../../../lib/profiles'
export async function GET(_: Request, { params }: { params: { slug: string } }) { const athlete = await prisma.athlete.findUnique({ where: { slug: params.slug } }); if (!athlete || !athlete.published) return NextResponse.json({ error: 'not-found' }, { status: 404 }); return NextResponse.json({ profile: publicAthlete(athlete) }) }
