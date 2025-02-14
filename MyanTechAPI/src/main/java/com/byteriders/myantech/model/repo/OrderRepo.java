package com.byteriders.myantech.model.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.byteriders.myantech.model.dto.output.BestSellingProductDto;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.repo.custom.OrderRepoCustom;

public interface OrderRepo extends JpaRepository<Order, Integer>, OrderRepoCustom {

	@Query("SELECT MAX(o.invoiceNo) FROM Order o")
    Optional<Integer> findMaxInvoiceNo();

	@Query("SELECT o FROM Order o LEFT JOIN FETCH o.shop s LEFT JOIN FETCH o.createdUser cu LEFT JOIN FETCH o.updatedUser uu")
	List<Order> findAllOrdersWithDetails();

	@Query("select o.id from Order o where o.createdDate = :today")
	int[] getTodayOrders(@Param ("today") LocalDate today);

	@Query("SELECT COALESCE(SUM(po.product.price * po.qty), 0) FROM ProductOrder po WHERE po.order.id = :orderId and po.order.status='DELIVERED'")
	Double getTotalSaleForOrder(@Param("orderId") int orderId);

	@Query("SELECT new com.byteriders.myantech.model.dto.output.BestSellingProductDto(p.id, p.name, SUM(po.qty)) " +
		       "FROM ProductOrder po " +
		       "JOIN po.product p " +
		       "JOIN po.order o " +
		       "WHERE o.createdDate >= :threeMonthsAgo " +
		       "GROUP BY p.id, p.name " +
		       "ORDER BY SUM(po.qty) DESC")
		List<BestSellingProductDto> getBestSelling(@Param("threeMonthsAgo") LocalDate threeMonthsAgo);
	
	 @Query(value = """
		        WITH RECURSIVE date_series AS (
		            -- Start from the first day of the current month
		            SELECT DATE_FORMAT(NOW(), '%Y-%m-01') AS orderDate
		            UNION ALL
		            -- Add one day at a time
		            SELECT DATE_ADD(orderDate, INTERVAL 1 DAY)
		            FROM date_series
		            -- Stop at the last day of the current month
		            WHERE orderDate < LAST_DAY(NOW())
		        )
		        SELECT 
		            ds.orderDate, 
		            COALESCE(SUM(po.qty * p.price), 0) AS totalCashSales
		        FROM date_series ds
		        LEFT JOIN orders o ON DATE(o.created_date) = ds.orderDate AND o.status = 'DELIVERED'
		        LEFT JOIN product_order po ON po.order_id = o.id
		        LEFT JOIN product p ON po.product_id = p.id
		        GROUP BY ds.orderDate
		        ORDER BY ds.orderDate
		    """, nativeQuery = true)
		    List<Object[]> findSalesForCurrentMonth();


}
