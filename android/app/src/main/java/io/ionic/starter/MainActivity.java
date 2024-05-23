package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.otpless.ionic.OtplessPlugin;
import android.os.Bundle;



public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(OtplessPlugin.class);
        super.onCreate(savedInstanceState);
    }
    @Override
    public void onBackPressed() {
        if (OtplessPlugin.onBackPressed(this)) return;
        super.onBackPressed();
    }
}
