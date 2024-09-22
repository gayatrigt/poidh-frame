import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface OGImageProps {
    name: string;
    description: string;
    imgSrc: string;
}

const DEFAULT_PROPS: OGImageProps = {
    name: 'Default Name',
    description: 'Default Description',
    imgSrc: 'https://i.imgur.com/nTC9fqE.jpeg',
};

function truncateDescription(description: string, maxWords: number): string {
    const words = description.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // Get dynamic values from URL parameters
    const props: OGImageProps = {
        name: searchParams.get('name') || DEFAULT_PROPS.name,
        description: searchParams.get('description') || DEFAULT_PROPS.description,
        imgSrc: searchParams.get('imgSrc') || DEFAULT_PROPS.imgSrc,
    };

    const descriptionWords = props.description.split(' ').length;
    const descriptionFontSize = descriptionWords > 100 ? '10px' : '20px';
    const truncatedDescription = truncateDescription(props.description, 50);

    return new ImageResponse(
        (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Background */}
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: `url("https://frame-degen.poidh.xyz/bg-poidh.png")`,
                        backgroundSize: '100% 100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        height: '100%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}
                />

                {/* Image */}
                <div
                    style={{
                        width: '60%',
                        height: '60%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        zIndex: 1,
                        margin: '20px 0',
                    }}
                >
                    <img
                        src={props.imgSrc}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            border: '2px solid white',
                        }}
                    />
                </div>

                {/* Text content */}
                <div
                    style={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            color: 'white',
                            fontFamily: 'Inter',
                            fontWeight: 800,
                            fontSize: '30px',
                            textAlign: 'center',
                            marginBottom: '10px',
                            width: '70%',
                        }}
                    >
                        {props.name}
                    </div>
                    <div
                        style={{
                            color: 'white',
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: descriptionFontSize,
                            textAlign: 'center',
                            width: '70%',
                        }}
                    >
                        {truncatedDescription}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}