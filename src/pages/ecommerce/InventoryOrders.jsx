import { Link } from "react-router-dom";
import {
  Boxes, RefreshCw, Bell, Workflow, RotateCcw, BarChart3, Search, PenTool, Wrench, Rocket, ShieldCheck, Clock,
  TrendingUp, Users, Package, ShoppingBag, Code2, Store, Calculator, Barcode, Warehouse,
} from "lucide-react";
import { Section } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { InventoryVisual } from "./EcommerceVisual";
import { ReorderCalculator } from "./EcommerceWidgets";
import { ECOMMERCE_LINKS } from "./services";

export default function InventoryOrders() {
  return (
    <EcommercePage
      path="/ecommerce/inventory-orders"
      title={{ text: "Inventory & order management setup that keeps every channel in sync", short: "Inventory & Order Management" }}
      subtitle={<>We set up <strong>real-time stock tracking, low-stock alerts and smooth order workflows</strong> across your store and marketplaces, so you never oversell and every order ships on time.</>}
      primary={{ label: "Organize my inventory", to: ECOMMERCE_LINKS.start("inventory-orders") }}
      secondary={{ label: "Try the reorder calculator", href: "#ec-reorder" }}
      visual={<InventoryVisual />}
      highlights={[
        { icon: <RefreshCw size={16} />, text: "Real-time stock sync" },
        { icon: <Bell size={16} />, text: "Low-stock alerts" },
        { icon: <Workflow size={16} />, text: "Order workflows" },
        { icon: <RotateCcw size={16} />, text: "Returns handling" },
      ]}
      overview={{
        title: "Know what you have, what's selling and what to reorder",
        body: [
          <>Inventory problems are expensive. Sell something you don't have and you face cancellations, refunds, unhappy customers and, on marketplaces, possible account penalties. Hold too much stock and your cash sits on shelves. As you add sales channels, keeping counts accurate by hand quickly becomes impossible.</>,
          <>Our inventory and order management setup gives you a single, reliable view of your stock and orders. We connect your online store and marketplaces so quantities update automatically whenever something sells, is returned or is restocked. We set reorder points and low-stock alerts based on your sales speed and supplier lead times, and we design order workflows covering status updates, routing to the right location, packing slips and returns, so nothing falls through the cracks.</>,
          <>Good inventory data starts with a clean catalog, so we often pair this service with <Link to="/ecommerce/product-listing">product listing and catalog setup</Link>. It also powers the rest of your operation: accurate stock keeps your <Link to="/ecommerce/cart-checkout">checkout</Link> honest, feeds <Link to="/ecommerce/shipping">shipping and fulfillment</Link>, and makes selling on <Link to="/ecommerce/marketplaces">eBay, Etsy and Walmart</Link> or <Link to="/ecommerce/amazon-setup">Amazon</Link> safe and simple.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Inventory system selection and setup",
            "Multichannel stock synchronization",
            "Reorder points and low-stock alerts",
            "Order statuses, routing and packing slips",
            "Returns and restocking workflow",
            "Inventory and sales reports",
          ],
        },
      }}
      services={{
        title: "Our inventory & order management services",
        subtitle: "The systems and workflows that keep stock accurate and orders moving.",
        items: [
          { icon: <RefreshCw size={24} />, title: "Multichannel stock sync", text: "One inventory count shared across your store and marketplaces, updated automatically after every sale." },
          { icon: <Bell size={24} />, title: "Reorder points & alerts", text: "Alerts based on sales speed, lead time and safety stock, so you restock before you run out." },
          { icon: <Workflow size={24} />, title: "Order workflows", text: "Clear order statuses, automatic routing and packing slips that keep fulfillment fast and accurate." },
          { icon: <Warehouse size={24} />, title: "Multi-location inventory", text: "Track stock across warehouses, stores or a 3PL and fulfill from the best location." },
          { icon: <RotateCcw size={24} />, title: "Returns & restocking", text: "A simple returns process that puts sellable items back into stock automatically." },
          { icon: <BarChart3 size={24} />, title: "Reporting", text: "See best sellers, slow movers and stock value so you buy smarter." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Assess", text: "Your channels, SKUs and current process." },
          { icon: <PenTool size={22} />, title: "Design", text: "Tools, workflows and reorder rules." },
          { icon: <Wrench size={22} />, title: "Set up", text: "Connect channels and import stock." },
          { icon: <Rocket size={22} />, title: "Train & launch", text: "Test orders, then hand over to your team." },
        ],
      }}
      benefits={{
        title: "What accurate inventory does for your business",
        items: [
          { icon: <ShieldCheck size={20} />, title: "No overselling", text: "Fewer cancellations and refunds." },
          { icon: <TrendingUp size={20} />, title: "Better cash flow", text: "Less money tied up in stock." },
          { icon: <Clock size={20} />, title: "Time saved", text: "No more manual count updates." },
          { icon: <Package size={20} />, title: "Faster shipping", text: "Orders flow straight to packing." },
          { icon: <Users size={20} />, title: "Happier customers", text: "Accurate availability and updates." },
          { icon: <BarChart3 size={20} />, title: "Smarter buying", text: "Data on what really sells." },
        ],
      }}
      tools={{
        title: "Tools and platforms we connect",
        subtitle: "We recommend the right tool for your size and channels, from built-in features to dedicated software.",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify inventory", text: "Locations, transfers and stock." },
          { icon: <Code2 size={20} />, title: "WooCommerce stock", text: "Stock management and plugins." },
          { icon: <Boxes size={20} />, title: "Inventory software", text: "Multichannel sync platforms." },
          { icon: <Store size={20} />, title: "Marketplaces", text: "Amazon, eBay, Etsy and Walmart." },
          { icon: <Barcode size={20} />, title: "Barcode scanning", text: "Faster, accurate counts." },
          { icon: <Calculator size={20} />, title: "Accounting", text: "Inventory value and cost of goods." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "A list of every channel where you sell",
          "Current stock counts by product and location",
          "SKUs for every product and variant",
          "Supplier lead times for your top products",
          "Your returns and exchange policy",
          "Admin access to your store and marketplaces",
        ],
      }}
      faqs={[
        ["What is multichannel inventory management?", "It means keeping a single, accurate stock count across every place you sell, such as your website, Amazon, eBay, Etsy and Walmart, and updating it automatically when an item sells, so you don't oversell."],
        ["How do I calculate a reorder point?", "A common formula is average daily sales multiplied by supplier lead time in days, plus safety stock. For example, selling 10 a day with a 14-day lead time and 50 units of safety stock gives a reorder point of 190 units."],
        ["Do I need separate inventory software?", "Not always. Shopify and WooCommerce include basic inventory tools that work well for a single store. Dedicated software becomes valuable when you sell on several channels or hold stock in multiple locations."],
        ["Can you connect my store to my warehouse or 3PL?", "Yes. We can connect your store and inventory system to your warehouse or third-party logistics provider so orders route automatically and stock levels stay accurate."],
        ["How do you handle returns?", "We set up a returns workflow that records why items come back, refunds or exchanges customers, and restocks sellable items automatically, keeping your inventory accurate."],
      ]}
      cta={{ title: "Take control of your stock and orders" }}
    >
      <Section id="ec-reorder" title="When should you reorder?" subtitle="Try our reorder point calculator. It uses the same formula we build into your inventory alerts.">
        <ReorderCalculator />
      </Section>
    </EcommercePage>
  );
}
