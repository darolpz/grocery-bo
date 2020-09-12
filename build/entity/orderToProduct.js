"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderToProduct = void 0;
var typeorm_1 = require("typeorm");
var product_1 = require("./product");
var order_1 = require("./order");
var OrderToProduct = /** @class */ (function () {
    function OrderToProduct() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], OrderToProduct.prototype, "OrderToCategoryId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderToProduct.prototype, "orderId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderToProduct.prototype, "productID", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderToProduct.prototype, "product_quantity", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return order_1.Order; }, function (order) { return order.orderToProduct; }),
        __metadata("design:type", order_1.Order)
    ], OrderToProduct.prototype, "order", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return product_1.Product; }, function (product) { return product.orderToProduct; }),
        __metadata("design:type", product_1.Product)
    ], OrderToProduct.prototype, "product", void 0);
    OrderToProduct = __decorate([
        typeorm_1.Entity()
    ], OrderToProduct);
    return OrderToProduct;
}());
exports.OrderToProduct = OrderToProduct;
//# sourceMappingURL=orderToProduct.js.map