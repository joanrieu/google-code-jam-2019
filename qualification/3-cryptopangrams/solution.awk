function gcd(a, b, t) {
  while (b) {
    t = b
    b = a % b
    a = t
  }
  return a
}

BEGIN {
  # precompute alphabet
  for (i = 1; i <= 26; ++i)
    ord[i] = sprintf("%c", i + 64)
}

NF > 2 {
  # decode input
  delete chr
  for (i = 1; $i == $(i+1); ++i)
    continue
  chr[1] = $i / gcd($i, $(i+1))
  for (i = 1; i <= NF; i++)
    chr[i+1] = $i / chr[i]

  # map primes to letters
  delete code
  for (i in chr)
    code[chr[i]]
  ord_i = 0
  for (i in code)
    code[i] = ord[++ord_i]

  # print payload
  printf("Case #%d: ", ++Case)
  for (i in chr)
    printf(code[chr[i]])
  printf("\n")
}
