
const puppeteer = require("puppeteer");
const url = `https://erp.cbit.org.in/Login.aspx?ReturnUrl=%2f`;

const getQuotes =async(i) => {
  
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  //let rollno=;
  // Open a new page
  const page = await browser.newPage();
  //page.setJavaScriptEnabled(false)
  // On this new page:
  
  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });
  
    const rollno=`1601207710${i}P`;
  
  

  
  
  // Display the quotes
  //console.log(quotes);
  await page.$eval('#txtUserName', (el,rolln) => el.value = rolln,rollno);
  
  await page.$eval( '#btnNext', form => form.click() );


  await page.$eval('#txtPassword', (el,rolln) => el.value = rolln,rollno);
  
  await page.$eval( '#btnSubmit', form => form.click() );

  
  
  const url1='https://erp.cbit.org.in/StudentLogin/Student/OverallResultStudent.aspx';
  await page.goto(url1, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });
  page.setJavaScriptEnabled(false)
  //await page.$eval( '#ctl00_cpStud_grdOverall', form => {form.click();} );
  const quotes1 = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const quote = document.querySelector("#ctl00_cpStud_grdOverall").innerText;
    const quote2 = document.querySelector("#ctl00_cpHeader_ucStudCorner_lblStudentName").innerText;
    
    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    //const text = quote.querySelector(".table table-hover table-striped").innerText;
    

    return { quote,quote2};
});

  //const quote = document.querySelector("#lnkStudentOfficeLogin").innerText;


  

  //console.log(rollno);
  console.log(quotes1)

  // Close the browser
  await browser.close();
}



;

// Start the scraping
for(let i=21;i<31;i++){
  if(i!=36 && i!=24){
    getQuotes(i);
  }
  

}
  
