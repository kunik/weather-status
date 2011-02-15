var TestRunner = (function() {
    function logEvent(event){
        //data variables
        var message = "";

        switch(event.type){
            case YUITest.TestRunner.BEGIN_EVENT:
                message = "Testing began at " + (new Date()).toString() + ".";
                break;

            case YUITest.TestRunner.COMPLETE_EVENT:
                message = event.results;
                break;

            case YUITest.TestRunner.TEST_FAIL_EVENT:
                message = event.testName + ": failed.\n" + event.error.getMessage();
                break;

            case YUITest.TestRunner.TEST_IGNORE_EVENT:
                message = event.testName + ": ignored.";
                break;

            case YUITest.TestRunner.TEST_PASS_EVENT:
                message = event.testName + ": passed.";
                break;

            case YUITest.TestRunner.TEST_SUITE_BEGIN_EVENT:
                message = "Test suite \"" + event.testSuite.name + "\" started.";
                break;

            case YUITest.TestRunner.TEST_SUITE_COMPLETE_EVENT:
                message = event.results;
                break;

            case YUITest.TestRunner.TEST_CASE_BEGIN_EVENT:
                message = "Test case \"" + event.testCase.name + "\" started.";
                break;

            case YUITest.TestRunner.TEST_CASE_COMPLETE_EVENT:
                message = event.results;
                break;
            default:
                message = "Unexpected event " + event.type;
        }

        //only log if required
        console.log(message);
    }

    //listen for events to publish to the logger
    YUITest.TestRunner.attach(YUITest.TestRunner.BEGIN_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.COMPLETE_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_CASE_BEGIN_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_CASE_COMPLETE_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_SUITE_BEGIN_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_SUITE_COMPLETE_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_PASS_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_FAIL_EVENT, logEvent);
    YUITest.TestRunner.attach(YUITest.TestRunner.TEST_IGNORE_EVENT, logEvent);

    return function(testCase) {
        YUITest.TestRunner.add(testCase);

        return {
            run: function() {
                YUITest.TestRunner.run();
            }
        }
    }

})();
