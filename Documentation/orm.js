
//her forsøker jeg å skrive ett ORM i kode

export class Region {
    constructor(region_id, region_description){
        this.region_id = region_id || null;
        this.region_description = region_description || "?";
    };
};

export class Customer {
    constructor(id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax){
        this.customer_id = id || "?";
        this.company_name = company_name || "?";
        this.contact_name = contact_name || "?";
        this.contact_title = contact_title || "?";
        this.address = address || "?";
        this.city = city || "?";
        this.region = region || null; 
        this.postal_code = postal_code || null;
        this.country = country || "?";
        this.phone = phone || null;
        this.fax = fax || null;
    };
};

export class Order {
    constructor(order_id, customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country){
        this.order_id = order_id || null;                  // smallint NOT NULL,
        this.customer_id = customer_id || "?";             // character varying(5),
        this.employee_id = employee_id || null;            // smallint,
        this.order_date = order_date || null;              // date,
        this.required_date = required_date || null;        // date,
        this.shipped_date = shipped_date || null;          // date,
        this.ship_via = ship_via || null;                  // smallint,
        this.freight = freight || null;                    // real,
        this.ship_name = ship_name || "?";                 // character varying(40),
        this.ship_address = ship_address || "?";           // character varying(60),
        this.ship_city = ship_city || "?";                 // character varying(15),
        this.ship_region = ship_region || "?";             // character varying(15),
        this.ship_postal_code = ship_postal_code || "?";   // character varying(10),
        this.ship_country = ship_country || "?";           // character varying(15)
    };
};

export class Employee {
    constructor(employee_id, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, extension, photo, notes, reports_to, photo_path){
        this.employee_id = employee_id || null;
        this.title = title || "?";
        this.title_of_courtesy = title_of_courtesy || "?";
        this.birth_date = birth_date || null;
        this.hire_date = hire_date || null;
        this.address = address || "?";
        this.city = city || "?";
        this.region = region || "?";
        this.postal_code = postal_code || "?";
        this.country = country || "?";
        this.home_phone = home_phone || "?";
        this.extension = extension || "?";
        this.photo = photo || "?";
        this.notes = notes || "?";
        this.reports_to = reports_to || null;
        this.photo_path = photo_path || "?";
    };
};

export class Category {
    constructor (category_id, category_name, description, picture){
       this.category_id = category_id || null;
       this.category_name = category_name || "?";
       this.description = description || "?";
       this.picture = picture || ["?"]; //bytearr
    };
};

export class Customer_customer_demo {
    constructor (customer_id, customer_type_id) {
        this.customer_id = customer_id || "?";
        this.customer_type_id = customer_type_id || "?";
    };
};

export class Customer_demographics {
    constructor (customer_type_id, customer_desc) {
        this.customer_type_id = customer_type_id || "?";
        this.customer_desc = customer_desc || "?";
    };
};

export class Employee_territory {
    constructor (employee_id, territory_id) {
        this.employee_id = employee_id || null;
        this.territory_id = territory_id || "?";
    };
};

export class Order_details {
    constructor (order_id, product_id, unit_price, quantity, discount) {
        this.order_id = order_id || null;
        this.product_id = product_id || null;
        this.unit_price = unit_price || null;
        this.quantity = quantity || null;
        this.discount = discount || null;
    };
};

export class Product {
    constructor (product_id, product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued) {
        this.product_id = product_id || null;
        this.product_name = product_name || "?";
        this.supplier_id = supplier_id || null;
        this.category_id = category_id || null;
        this.quantity_per_unit = quantity_per_unit || "?";
        this.unit_price = unit_price || null;
        this.units_in_stock = units_in_stock || null;
        this.units_on_order = units_on_order || null;
        this.reorder_level = reorder_level || null;
        this.discontinued = discontinued || null;
    };
};