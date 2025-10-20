"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface ProductTabsProps {
  saree: {
    characteristics: string | null;
    fabric: string | null;
    type: string;
    region: {
      name: string;
      galleries?: any[];
    };
  };
}

export function ProductTabs({ saree }: ProductTabsProps) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="care">Care Instructions</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-maroon mb-2">Description</h3>
              <p className="text-muted-foreground">
                {saree.characteristics ||
                  "This exquisite saree showcases the finest traditional craftsmanship from " +
                    saree.region.name +
                    ". Each piece is carefully woven with attention to detail and quality."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SpecItem label="Type" value={saree.type} />
                <SpecItem label="Fabric" value={saree.fabric || "Pure Silk"} />
                <SpecItem label="Region" value={saree.region.name} />
                <SpecItem label="Occasion" value="Wedding, Festivals, Parties" />
                <SpecItem label="Blouse" value="Included (Unstitched)" />
                <SpecItem label="Length" value="5.5 meters + 0.8m Blouse" />
              </dl>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">Heritage</h3>
              <p className="text-muted-foreground">
                Handwoven by skilled artisans in {saree.region.name}, this saree represents
                centuries of weaving tradition. Each saree takes days to complete and is a
                testament to India's rich textile heritage.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="care">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-maroon mb-2">Washing Instructions</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Dry clean recommended for best results</li>
                <li>If hand washing, use cold water with mild detergent</li>
                <li>Do not wring or twist the fabric</li>
                <li>Avoid direct sunlight while drying</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">Storage</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Store in a cool, dry place away from direct sunlight</li>
                <li>Wrap in muslin cloth for long-term storage</li>
                <li>Add neem leaves or camphor to prevent insects</li>
                <li>Refold periodically to avoid permanent creases</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">Ironing</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Iron on medium heat while still slightly damp</li>
                <li>Use a pressing cloth to protect zari work</li>
                <li>Iron from the reverse side for best results</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shipping">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-maroon mb-2">Delivery Options</h3>
              <ul className="space-y-3">
                <ShippingOption
                  type="Standard Delivery"
                  duration="5-7 business days"
                  cost="Free for orders above ₹5,000"
                />
                <ShippingOption
                  type="Express Delivery"
                  duration="2-3 business days"
                  cost="₹200"
                />
                <ShippingOption
                  type="Same Day Delivery"
                  duration="Within 24 hours"
                  cost="₹500 (Available in select cities)"
                />
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">Return Policy</h3>
              <p className="text-muted-foreground mb-2">
                We offer a 7-day return and exchange policy for all products.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>Product must be unused and in original packaging</li>
                <li>Tags and labels must be intact</li>
                <li>Return shipping cost may apply</li>
                <li>Refund will be processed within 5-7 business days</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-maroon mb-2">International Shipping</h3>
              <p className="text-muted-foreground">
                We ship worldwide. International shipping rates and delivery times vary by
                location. Contact us for a quote.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function ShippingOption({
  type,
  duration,
  cost,
}: {
  type: string;
  duration: string;
  cost: string;
}) {
  return (
    <li className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
      <div>
        <p className="font-medium">{type}</p>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>
      <span className="text-sm font-medium text-maroon">{cost}</span>
    </li>
  );
}


