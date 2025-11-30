import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/config";
import { MenuItemImage } from "@/components/menu-item-image";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  desc: string;
  timings: string;
  ingredients: string;
  priority: number;
  imgSrc: string;
}

async function getMenuItems(): Promise<{ items: MenuItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/menu`, { cache: "no-store" });

    if (!res.ok) {
      return {
        items: [],
        error: `Failed to fetch: ${res.status} ${res.statusText}`,
      };
    }

    const items = await res.json();
    return { items };
  } catch (error) {
    console.error("Error fetching menu:", error);
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function MenuPage() {
  const { items: menuItems, error } = await getMenuItems();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-saffron-gradient text-white py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl mb-4 tracking-tight">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-neutral-50 max-w-2xl mx-auto">
            Authentic South Indian flavors prepared with traditional recipes
          </p>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {error ? (
            <div className="text-center text-neutral-600 py-12">
              <p className="text-xl text-error-500 font-medium">
                Unable to load menu items
              </p>
              <p className="text-sm mt-2 text-neutral-500">{error}</p>
              <p className="text-sm mt-4">
                Please ensure the backend server is running at {API_URL}
              </p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center text-neutral-600 py-12">
              <p className="text-xl">No menu items found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card
                  key={item._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-neutral-200"
                >
                  <div className="aspect-video relative bg-neutral-100">
                    <MenuItemImage src={item.imgSrc} alt={item.name} />
                    <Badge className="absolute top-4 right-4 bg-white text-primary-700 hover:bg-white z-10">
                      {item.timings}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="font-heading text-xl text-primary-900">
                        {item.name}
                      </CardTitle>
                      <span className="font-heading text-lg text-primary-600 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="text-sm text-neutral-600">
                      <span className="font-medium text-neutral-900">
                        Ingredients:
                      </span>{" "}
                      {item.ingredients}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
