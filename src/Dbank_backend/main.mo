import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";


actor Dbank {
  stable var counter: Float = 300;

  stable var startTime = Time.now();

  public func topUp(amount: Float) {
    counter += amount;
    Debug.print(debug_show(counter));
  };

  public func withdraw(amount: Float) {
    let tempValue: Float = counter - amount;
    if (tempValue >= 0) {
      counter -= amount;
      Debug.print(debug_show(counter));
    } else {
      Debug.print("Wrong input");
    }
    
  };

  public query func checkBalance(): async Float {
    return counter;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeEllapsedNs = currentTime - startTime;
    let timeEllapsedS = timeEllapsedNs / 1000000000;
    counter := counter * (1.01 ** Float.fromInt(timeEllapsedS));
    startTime := currentTime;
  }

}