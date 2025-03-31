
//her forsøker jeg å skrive ett ORM

class Region {
    constructor(region_id, region_description){
        this.region_id = region_id || null;
        this.region_description = region_description || "?";
    }
}

class Customer {
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

class Order {
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





const stuff = new Customer()

console.log(stuff);