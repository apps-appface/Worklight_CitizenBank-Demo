Instruction for Running Worklight(MobileFirst-new version) WorkCover-NSW App in Tablet 
--------------------------------------------------------------------------

1. Install Eclipse in your system

The supported versions of Eclipse are
– Eclipse Juno v4.2.2 (SR2)
– Eclipse Kepler v4.3.1 (SR1)
– Eclipse Classic v4.2.2
– Eclipse Classic v4.3.1

2.Install IBM Worklight(IBM MobileFirst) plugin in Eclipse

  Procedure
  ---------
  
 -Start your Eclipse JUNO IDE workbench.
 -Click Help > Eclipse Marketplace.
 -Search for IBM Worklight(IBM MobileFirst) Studio and click go (or) you can use link http://public.dhe.ibm.com/ibmdl/export/pub/software/products/en/MobileFirstPlatform/mfpsupdate/ to install plugin.
 -Select IBM Worklight(IBM MobileFirst) Studio and click on install.
 -Select the features of IBM Worklight(IBM MobileFirst) Studio that you want to install, and then click Next.
 -On the Install Details page, review the features that you are installing, and then click Next.
 -On the Review Licenses page, review the license text. If you agree to the terms, click I accept the terms of the license agreement and then click Finish. The installation process starts.
 -When the installation process completes, restart the workbench.
 -Create the path for Workspace and click ok.
 -Eclipse IDE will open.
 
 For Database
 ------------
 
 -install mysql in your system.
 -Create WorkCoverNSW Database and import WorkCover.sql file to that database.
 
3.Import project in your workspace
 
4.Change the Database name from each adapter's xml file.
 
5.Right click project/apps/app/WorkCover and select run on IBM MobileFirst Development Server.
 
6.Deploy each adapter by right clicking on project/adapter/adapter_name and select Deploy adapter option.
 
7.Right click on project and select Open IBM MobileFirst Console to run on WorklightServer.
 
8.Select android to see application in worklight mobile simulator.