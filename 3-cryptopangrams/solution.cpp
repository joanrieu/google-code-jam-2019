#include <iostream>
#include <vector>
#include <set>
#include <map>

using namespace std;
typedef unsigned long long ull;

ull gcd(ull a, ull b) {
  ull t;
  while (b) {
    t = b;
    b = a % b;
    a = t;
  }
  return a;
}

int main() {
  ull cases;
  cin >> cases;

  for (ull c = 0; c < cases; ++c) {
    // read input
    ull max, product_count;
    cin >> max >> product_count;
    vector<ull> products(product_count), primes(product_count+1);
    ull i;
    for (i = 0; i < product_count; ++i)
      cin >> products[i];

    // decode input
    for (i = 0; products[i] == products[i+1]; ++i)
      continue;
    primes[0] = products[0] / gcd(products[i], products[i+1]);
    for (i = 0; i < product_count; ++i)
      primes[i+1] = products[i] / primes[i];

    // map primes to letters
    set<ull> primes_sorted(primes.begin(), primes.end());
    map<ull, char> chars;
    char letter = 'A';
    for (const auto& prime: primes_sorted)
      chars.insert(make_pair(prime, letter++));

    cout << "Case #" << (c+1) << ": ";
    for (const auto& prime: primes)
      cout << chars[prime];
    cout << "\n";
  }
}
