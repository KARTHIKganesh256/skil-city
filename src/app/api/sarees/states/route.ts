import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const states = [
      {
        id: 'andhra-pradesh',
        name: 'Andhra Pradesh',
        code: 'AP',
        description: 'Home to Dharmavaram and other traditional silk weaving centers',
        image: '/images/states/andhra-pradesh.jpg',
        sareeTypes: ['Dharmavaram', 'Ikat', 'Mangalagiri'],
        regions: [
          {
            id: 'dharmavaram',
            name: 'Dharmavaram',
            description: 'Famous for heavy silk sarees with rich zari work',
            specialties: ['Heavy silk', 'Zari work', 'Traditional motifs']
          },
          {
            id: 'mangalagiri',
            name: 'Mangalagiri',
            description: 'Known for cotton sarees with temple designs',
            specialties: ['Cotton sarees', 'Temple designs', 'Lightweight']
          }
        ],
        totalSarees: 1250,
        avgPrice: 25000
      },
      {
        id: 'tamil-nadu',
        name: 'Tamil Nadu',
        code: 'TN',
        description: 'Famous for Kanchipuram silk sarees and traditional weaving',
        image: '/images/states/tamil-nadu.jpg',
        sareeTypes: ['Kanchipuram', 'Arni', 'Thirubhuvanam'],
        regions: [
          {
            id: 'kanchipuram',
            name: 'Kanchipuram',
            description: 'World-renowned for pure silk sarees with temple borders',
            specialties: ['Pure silk', 'Temple borders', 'Gold zari']
          },
          {
            id: 'arni',
            name: 'Arni',
            description: 'Traditional silk weaving with unique patterns',
            specialties: ['Silk weaving', 'Traditional patterns', 'Quality silk']
          }
        ],
        totalSarees: 2100,
        avgPrice: 35000
      },
      {
        id: 'uttar-pradesh',
        name: 'Uttar Pradesh',
        code: 'UP',
        description: 'Home to the famous Banarasi silk sarees',
        image: '/images/states/uttar-pradesh.jpg',
        sareeTypes: ['Banarasi', 'Chikankari'],
        regions: [
          {
            id: 'varanasi',
            name: 'Varanasi',
            description: 'Famous for Banarasi silk sarees with brocade work',
            specialties: ['Brocade work', 'Intricate patterns', 'Metallic threads']
          }
        ],
        totalSarees: 1800,
        avgPrice: 28000
      },
      {
        id: 'karnataka',
        name: 'Karnataka',
        code: 'KA',
        description: 'Known for Mysore silk and traditional weaving',
        image: '/images/states/karnataka.jpg',
        sareeTypes: ['Mysore Silk', 'Ilkal'],
        regions: [
          {
            id: 'mysore',
            name: 'Mysore',
            description: 'Famous for soft and lightweight silk sarees',
            specialties: ['Lightweight silk', 'Soft texture', 'Subtle designs']
          },
          {
            id: 'ilkal',
            name: 'Ilkal',
            description: 'Traditional cotton sarees with unique borders',
            specialties: ['Cotton sarees', 'Unique borders', 'Traditional weaving']
          }
        ],
        totalSarees: 1650,
        avgPrice: 22000
      },
      {
        id: 'gujarat',
        name: 'Gujarat',
        code: 'GJ',
        description: 'Famous for Patola, Bandhani and other traditional sarees',
        image: '/images/states/gujarat.jpg',
        sareeTypes: ['Patola', 'Bandhani', 'Gujarati'],
        regions: [
          {
            id: 'patan',
            name: 'Patan',
            description: 'World-famous for Patola double ikat sarees',
            specialties: ['Double ikat', 'Geometric patterns', 'Unique technique']
          },
          {
            id: 'jamnagar',
            name: 'Jamnagar',
            description: 'Known for Bandhani tie-dye sarees',
            specialties: ['Tie-dye technique', 'Vibrant colors', 'Lightweight']
          }
        ],
        totalSarees: 1950,
        avgPrice: 32000
      },
      {
        id: 'rajasthan',
        name: 'Rajasthan',
        code: 'RJ',
        description: 'Rich tradition of Bandhani and other colorful sarees',
        image: '/images/states/rajasthan.jpg',
        sareeTypes: ['Bandhani', 'Rajasthani'],
        regions: [
          {
            id: 'jaipur',
            name: 'Jaipur',
            description: 'Famous for Bandhani and block print sarees',
            specialties: ['Bandhani', 'Block prints', 'Colorful designs']
          }
        ],
        totalSarees: 1200,
        avgPrice: 18000
      },
      {
        id: 'madhya-pradesh',
        name: 'Madhya Pradesh',
        code: 'MP',
        description: 'Home to Chanderi and Maheshwari sarees',
        image: '/images/states/madhya-pradesh.jpg',
        sareeTypes: ['Chanderi', 'Maheshwari'],
        regions: [
          {
            id: 'chanderi',
            name: 'Chanderi',
            description: 'Famous for lightweight silk sarees with gold motifs',
            specialties: ['Lightweight silk', 'Gold motifs', 'Sheer texture']
          },
          {
            id: 'maheshwar',
            name: 'Maheshwar',
            description: 'Traditional cotton and silk blend sarees',
            specialties: ['Cotton-silk blend', 'Traditional patterns', 'Comfortable']
          }
        ],
        totalSarees: 1100,
        avgPrice: 20000
      },
      {
        id: 'odisha',
        name: 'Odisha',
        code: 'OD',
        description: 'Known for Ikat and Sambalpuri sarees',
        image: '/images/states/odisha.jpg',
        sareeTypes: ['Ikat', 'Sambalpuri'],
        regions: [
          {
            id: 'bhubaneswar',
            name: 'Bhubaneswar',
            description: 'Famous for Ikat weave sarees',
            specialties: ['Ikat weave', 'Unique patterns', 'Colorful']
          }
        ],
        totalSarees: 950,
        avgPrice: 15000
      },
      {
        id: 'west-bengal',
        name: 'West Bengal',
        code: 'WB',
        description: 'Famous for Tussar silk and traditional weaving',
        image: '/images/states/west-bengal.jpg',
        sareeTypes: ['Tussar Silk', 'Baluchari'],
        regions: [
          {
            id: 'murshidabad',
            name: 'Murshidabad',
            description: 'Known for Tussar silk sarees',
            specialties: ['Tussar silk', 'Natural golden color', 'Eco-friendly']
          }
        ],
        totalSarees: 800,
        avgPrice: 18000
      },
      {
        id: 'telangana',
        name: 'Telangana',
        code: 'TG',
        description: 'Home to Pochampally Ikat and other traditional sarees',
        image: '/images/states/telangana.jpg',
        sareeTypes: ['Pochampally Ikat', 'Gadwal'],
        regions: [
          {
            id: 'pochampally',
            name: 'Pochampally',
            description: 'Famous for Ikat sarees with geometric patterns',
            specialties: ['Ikat sarees', 'Geometric patterns', 'Colorful']
          },
          {
            id: 'gadwal',
            name: 'Gadwal',
            description: 'Known for cotton sarees with silk borders',
            specialties: ['Cotton sarees', 'Silk borders', 'Traditional weaving']
          }
        ],
        totalSarees: 1400,
        avgPrice: 22000
      }
    ];

    return NextResponse.json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json(
      { error: 'Failed to fetch states' },
      { status: 500 }
    );
  }
}


