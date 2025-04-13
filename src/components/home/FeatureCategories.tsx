
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const FeatureCategories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Shop By Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <div className="flex items-center text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Shop now</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCategories;
