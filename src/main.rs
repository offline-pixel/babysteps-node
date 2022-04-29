fn main() {
    println!("Hello, Node!");
}
#[Rust changes the name of the function in the compiled output and by default these functions are not publicly accessible. To fix these issues, try this:]
#[no_mangle]
pub extern fn fibonacci(x: i32) -> i32 {
  if x <= 2 {
    return 1;
  } else {
    return fibonacci(x - 1) + fibonacci(x - 2);
  }
}
