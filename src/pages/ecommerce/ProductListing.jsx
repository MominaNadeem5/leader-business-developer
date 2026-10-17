import { Link } from "react-router-dom";
import {
  Tags, FileText, FolderTree, Layers, Upload, Image, Search, PenTool, Wrench, Rocket, TrendingUp, Eye, Clock,
  ShieldCheck, RefreshCw, Store, ShoppingBag, Code2, Table, Globe, Barcode,
} from "lucide-react";
import { Section } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { CatalogVisual } from "./EcommerceVisual";
import { ListingScore } from "./EcommerceWidgets";
import { ECOMMERCE_LINKS } from "./services";

export default function ProductListing() {
  return (
    <EcommercePage
      path="/ecommerce/product-listing"
      title={{ text: "Product listing & catalog setup that helps products get found and sold", short: "Product Listing & Catalog Setup" }}
      subtitle={<>We create <strong>search-friendly product pages and a well-organized catalog</strong> for your store and marketplaces, with clear titles, persuasive descriptions, accurate data and tidy categories.</>}
      primary={{ label: "Set up my catalog", to: ECOMMERCE_LINKS.start("product-listing") }}
      secondary={{ label: "Score your listing", href: "#ec-score" }}
      visual={<CatalogVisual />}
      highlights={[
        { icon: <Search size={16} />, text: "SEO product titles" },
        { icon: <FileText size={16} />, text: "Persuasive descriptions" },
        { icon: <FolderTree size={16} />, text: "Clean categories" },
        { icon: <Upload size={16} />, text: "Bulk uploads" },
      ]}
      overview={{
        title: "Great products deserve listings that sell them",
        body: [
          <>Your product pages do the job of a salesperson. Shoppers can't touch or try your products, so they rely on your photos, titles, descriptions and specifications to decide. Search engines and marketplaces rely on the same information to decide when to show your products. Thin descriptions, missing details or messy categories cost you visibility and sales.</>,
          <>Our product listing and catalog setup service turns your product information into complete, consistent and search-optimized listings. We research the keywords your customers actually use, write clear titles and benefit-led descriptions, organize variants like size and color, and build a logical category structure that makes browsing easy. Behind the scenes, we clean up your product data, with SKUs, barcodes (GTIN/UPC), weights and attributes, so it works everywhere you sell.</>,
          <>Whether you have ten products or ten thousand, we handle single listings and bulk CSV uploads for Shopify, WooCommerce and marketplaces. A clean catalog also makes everything downstream easier, from <Link to="/ecommerce/inventory-orders">inventory tracking</Link> and <Link to="/ecommerce/shipping">accurate shipping rates</Link> to <Link to="/ecommerce/marketplaces">marketplace integration</Link> and <Link to="/ecommerce/amazon-setup">Amazon listings</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Keyword research for your product range",
            "SEO titles, descriptions and meta tags",
            "Category and collection structure",
            "Variants, SKUs, barcodes and attributes",
            "Image optimization and alt text",
            "Bulk CSV import or manual entry",
          ],
        },
      }}
      services={{
        title: "Our product listing & catalog services",
        subtitle: "Everything it takes to turn product information into pages that convert.",
        items: [
          { icon: <Search size={24} />, title: "Keyword research", text: "Find the search terms shoppers use, then weave them naturally into titles, descriptions and tags." },
          { icon: <FileText size={24} />, title: "Product copywriting", text: "Clear, benefit-led descriptions with scannable bullet points and complete specifications." },
          { icon: <FolderTree size={24} />, title: "Catalog structure", text: "Logical categories, collections and filters so customers find products in a few clicks." },
          { icon: <Layers size={24} />, title: "Variants & attributes", text: "Sizes, colors and materials grouped under one product, with accurate attributes for filtering." },
          { icon: <Image size={24} />, title: "Image optimization", text: "Consistent sizing, compression for fast loading, and descriptive alt text for accessibility and SEO." },
          { icon: <Upload size={24} />, title: "Bulk upload & data cleanup", text: "CSV templates, data cleanup and bulk imports, including SKUs, barcodes, weights and prices." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Audit", text: "Your current products, data and competitors." },
          { icon: <PenTool size={22} />, title: "Research & write", text: "Keywords, titles and descriptions." },
          { icon: <Wrench size={22} />, title: "Build catalog", text: "Categories, variants and uploads." },
          { icon: <Rocket size={22} />, title: "Review & publish", text: "Quality check, then go live." },
        ],
      }}
      benefits={{
        title: "Why professional product listings pay off",
        items: [
          { icon: <Eye size={20} />, title: "Better visibility", text: "Rank for the terms buyers search." },
          { icon: <TrendingUp size={20} />, title: "Higher conversions", text: "Answers that help shoppers decide." },
          { icon: <ShieldCheck size={20} />, title: "Fewer returns", text: "Accurate details set clear expectations." },
          { icon: <Clock size={20} />, title: "Faster launches", text: "New products listed in less time." },
          { icon: <RefreshCw size={20} />, title: "Consistent everywhere", text: "One source of product truth." },
          { icon: <Barcode size={20} />, title: "Marketplace ready", text: "Data that meets channel rules." },
        ],
      }}
      tools={{
        title: "Platforms we create listings for",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify", text: "Products, collections and metafields." },
          { icon: <Code2 size={20} />, title: "WooCommerce", text: "Products, categories and attributes." },
          { icon: <Store size={20} />, title: "Amazon, eBay & Etsy", text: "Channel-specific listing formats." },
          { icon: <Globe size={20} />, title: "Walmart Marketplace", text: "Item setup and content rules." },
          { icon: <Table size={20} />, title: "CSV & spreadsheets", text: "Bulk templates and imports." },
          { icon: <Tags size={20} />, title: "Shopping feeds", text: "Product data for shopping ads." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "A product list or spreadsheet (even a rough one)",
          "Product photos, or access to your photographer",
          "Prices, SKUs and stock quantities",
          "Sizes, materials, weights and dimensions",
          "Barcodes (GTIN/UPC) if you sell on marketplaces",
          "Admin access to your store",
        ],
      }}
      faqs={[
        ["What makes a good product listing?", "A strong listing has a clear, keyword-rich title, several high-quality photos, a benefit-focused description with scannable bullets, complete specifications and accurate variants. It answers a shopper's questions before they have to ask."],
        ["Do you write unique product descriptions?", "Yes. We write original descriptions for your products instead of copying manufacturer text, which helps you stand out and avoid duplicate content issues with search engines."],
        ["Can you upload products in bulk?", "Yes. We prepare and clean your data in a CSV template and import it in bulk to Shopify, WooCommerce or supported marketplaces, so large catalogs go live quickly and accurately."],
        ["Do I need barcodes (UPCs) for my products?", "For your own store, usually not. Many marketplaces, including Amazon and Walmart, generally require a GTIN such as a UPC unless you qualify for an exemption. We'll explain what each channel requires."],
        ["Will optimized listings improve my search rankings?", "Well-optimized listings give search engines and marketplaces the information they need to show your products for relevant searches. Rankings also depend on factors like competition, reviews and site performance, so no one can honestly guarantee a position."],
      ]}
      cta={{ title: "Turn your catalog into your best salesperson" }}
    >
      <Section id="ec-score" title="How strong is your product listing?" subtitle="Use this quick checker to see where a listing stands and what to improve.">
        <ListingScore />
      </Section>
    </EcommercePage>
  );
}
