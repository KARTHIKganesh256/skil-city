import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sareeTypes = [
      {
        id: 'dharmavaram',
        name: 'Dharmavaram',
        description: 'Traditional silk sarees from Dharmavaram with rich zari work',
        image: '/images/saree-types/dharmavaram.jpg',
        characteristics: ['Heavy silk', 'Rich zari work', 'Traditional motifs', 'Durable'],
        priceRange: { min: 15000, max: 100000 },
        states: ['Andhra Pradesh', 'Telangana'],
        regions: ['Dharmavaram', 'Pochampally', 'Gadwal']
      },
      {
        id: 'kanchipuram',
        name: 'Kanchipuram',
        description: 'Luxurious silk sarees from Kanchipuram with temple borders',
        image: '/images/saree-types/kanchipuram.jpg',
        characteristics: ['Pure silk', 'Temple borders', 'Gold zari', 'Heavy weight'],
        priceRange: { min: 20000, max: 150000 },
        states: ['Tamil Nadu'],
        regions: ['Kanchipuram', 'Arni', 'Thirubhuvanam']
      },
      {
        id: 'banarasi',
        name: 'Banarasi',
        description: 'Elegant silk sarees from Varanasi with intricate brocade work',
        image: '/images/saree-types/banarasi.jpg',
        characteristics: ['Brocade work', 'Intricate patterns', 'Metallic threads', 'Elegant'],
        priceRange: { min: 10000, max: 80000 },
        states: ['Uttar Pradesh'],
        regions: ['Varanasi', 'Mirzapur']
      },
      {
        id: 'mysore',
        name: 'Mysore Silk',
        description: 'Soft and lightweight silk sarees from Mysore',
        image: '/images/saree-types/mysore.jpg',
        characteristics: ['Lightweight', 'Soft texture', 'Subtle designs', 'Comfortable'],
        priceRange: { min: 8000, max: 50000 },
        states: ['Karnataka'],
        regions: ['Mysore', 'Bangalore', 'Ramanagara']
      },
      {
        id: 'patola',
        name: 'Patola',
        description: 'Double ikat silk sarees from Gujarat with geometric patterns',
        image: '/images/saree-types/patola.jpg',
        characteristics: ['Double ikat', 'Geometric patterns', 'Colorful', 'Unique'],
        priceRange: { min: 25000, max: 200000 },
        states: ['Gujarat'],
        regions: ['Patan', 'Rajkot']
      },
      {
        id: 'bandhani',
        name: 'Bandhani',
        description: 'Tie-dye silk sarees with vibrant colors and patterns',
        image: '/images/saree-types/bandhani.jpg',
        characteristics: ['Tie-dye technique', 'Vibrant colors', 'Lightweight', 'Festive'],
        priceRange: { min: 5000, max: 30000 },
        states: ['Gujarat', 'Rajasthan'],
        regions: ['Jamnagar', 'Bhuj', 'Jaipur']
      },
      {
        id: 'chanderi',
        name: 'Chanderi',
        description: 'Lightweight silk sarees with gold and silver motifs',
        image: '/images/saree-types/chanderi.jpg',
        characteristics: ['Lightweight', 'Gold motifs', 'Sheer texture', 'Elegant'],
        priceRange: { min: 8000, max: 40000 },
        states: ['Madhya Pradesh'],
        regions: ['Chanderi', 'Gwalior']
      },
      {
        id: 'maheshwari',
        name: 'Maheshwari',
        description: 'Traditional cotton and silk blend sarees from Maheshwar',
        image: '/images/saree-types/maheshwari.jpg',
        characteristics: ['Cotton-silk blend', 'Traditional patterns', 'Comfortable', 'Versatile'],
        priceRange: { min: 3000, max: 25000 },
        states: ['Madhya Pradesh'],
        regions: ['Maheshwar', 'Indore']
      },
      {
        id: 'ikkat',
        name: 'Ikat',
        description: 'Traditional ikat weave sarees with unique patterns',
        image: '/images/saree-types/ikkat.jpg',
        characteristics: ['Ikat weave', 'Unique patterns', 'Colorful', 'Artistic'],
        priceRange: { min: 6000, max: 35000 },
        states: ['Odisha', 'Andhra Pradesh', 'Telangana'],
        regions: ['Bhubaneswar', 'Berhampur', 'Pochampally']
      },
      {
        id: 'tussar',
        name: 'Tussar Silk',
        description: 'Wild silk sarees with natural golden color',
        image: '/images/saree-types/tussar.jpg',
        characteristics: ['Wild silk', 'Natural golden color', 'Eco-friendly', 'Unique texture'],
        priceRange: { min: 5000, max: 30000 },
        states: ['Jharkhand', 'Bihar', 'West Bengal'],
        regions: ['Ranchi', 'Bhagalpur', 'Murshidabad']
      }
    ];

    return NextResponse.json(sareeTypes);
  } catch (error) {
    console.error('Error fetching saree types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saree types' },
      { status: 500 }
    );
  }
}

