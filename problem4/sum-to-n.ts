/**
 * Problem 4: Three ways to sum to n
 */

// Method 1: Using for loop
/**
 * Calculates sum using iterative approach
 * @param n - The upper limit of the sequence
 * @returns The sum of numbers from 1 to n
 * @example
 * sum_to_n_a(5) = 1 + 2 + 3 + 4 + 5 = 15
 */
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Time Complexity: O(n) - linear
// Space Complexity: O(1) - constant
// Pros: Easy to understand, straightforward implementation
// Cons: Not efficient for large numbers, requires n iterations

// Method 2: Using mathematical formula
/**
 * Calculates sum using Gauss's formula: n * (n + 1) / 2
 * @param n - The upper limit of the sequence
 * @returns The sum of numbers from 1 to n
 * @example
 * sum_to_n_b(5) = 5 * (5 + 1) / 2 = 15
 */
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}
// Time Complexity: O(1) - constant
// Space Complexity: O(1) - constant
// Pros: Most efficient solution, constant time regardless of input size
// Cons: May be less intuitive for those unfamiliar with the mathematical formula

// Method 3: Using recursion
/**
 * Calculates sum using recursive approach
 * @param n - The upper limit of the sequence
 * @returns The sum of numbers from 1 to n
 * @example
 * sum_to_n_c(5) = 5 + sum_to_n_c(4)
 *                = 5 + 4 + sum_to_n_c(3)
 *                = 5 + 4 + 3 + sum_to_n_c(2)
 *                = 5 + 4 + 3 + 2 + sum_to_n_c(1)
 *                = 5 + 4 + 3 + 2 + 1
 *                = 15
 */
function sum_to_n_c(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}
// Time Complexity: O(n) - linear
// Space Complexity: O(n) - linear due to call stack
// Pros: Elegant and mathematically intuitive solution
// Cons: Stack memory intensive, risk of stack overflow for large n 