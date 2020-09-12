"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var orderToProduct_1 = require("./orderToProduct");
var product_1 = require("./product");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Order.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "obvervations", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "final_amount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return product_1.Product; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Order.prototype, "products", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return orderToProduct_1.OrderToProduct; }, function (orderToProduct) { return orderToProduct.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "orderToProduct", void 0);
    Order = __decorate([
        typeorm_1.Entity()
    ], Order);
    return Order;
}(typeorm_1.BaseEntity));
exports.Order = Order;
//# sourceMappingURL=order.js.map